using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.Loader;
using System.Threading;
using System.Threading.Tasks;
using Basic.Reference.Assemblies;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.Emit;
using Newtonsoft.Json;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Web.BackgroundServices
{
    public class CSharpCodeTester
    {
        private readonly Dictionary<int, List<Test>> _dictionary;
        
        private string _generatedCode;
        private CSharpCompilation _compilation;
        private Assembly _generatedAssembly;
        private List<Test> _tests;


        public CSharpCodeTester(Dictionary<int, List<Test>> dictionary)
        {
            _dictionary = dictionary;
        }


        public async Task<double> TestCode(Submission submission)
        {
            try
            {
                _generatedCode = submission.Body;
                _tests = _dictionary.GetValueOrDefault(submission.ExerciseId);
                CreateCompilation();
                CompileAndLoadAssembly();

                var res = await RunTests();
                Clear();

                return res;
            }
            catch
            {
                return 0;
            }
        }


        private async Task<double> RunTests()
        {
            int totalTests = _tests.Count();
            const int timeout = 2;

            var tasks = _tests.Select(async (test) =>
            {
                try
                {
                    var cts = new CancellationTokenSource();
                    cts.CancelAfter(TimeSpan.FromSeconds(timeout));
                    var task = await RunTestCase(test, cts.Token);

                    return task ? 1 : 0;
                }
                catch
                {
                    return 0;
                }
            });

            var passedTests = (await Task.WhenAll(tasks)).Sum();

            return Math.Round((double)passedTests * 100 / totalTests, MidpointRounding.AwayFromZero);
        }



        private Task<bool> RunTestCase(Test test, CancellationToken token)
        {
            return Task.Run(() =>
            {
                var classType = _generatedAssembly.GetType(test.ClassName);
                var instance = Activator.CreateInstance(classType);
                var method = classType.GetTypeInfo().GetDeclaredMethod(test.Method);

                if (method == null  || method.ReturnType.Name != test.ResultType)
                {
                    return false;
                }

                var parameters = new ArrayList(test.ParamsJson.Split(';')
                    .Select(valType =>
                    {
                        var pair = valType.Split(':');
                        var val = pair[0];
                        var type = Type.GetType(pair[1]);

                        return JsonConvert.DeserializeObject(val, type);
                    }).ToList()
                );

                
                var result = method.Invoke(instance, parameters.ToArray());

                return result?.ToString() == test.ExpectedResult;
            }, token);
        }


        private void CreateCompilation()
        {
            var syntaxTree = CSharpSyntaxTree.ParseText(_generatedCode);
            string assemblyName = Guid.NewGuid().ToString();
            var references = Net50.All;
            var compilation = CSharpCompilation.Create(
                assemblyName,
                new[] { syntaxTree },
                references,
                new CSharpCompilationOptions(OutputKind.DynamicallyLinkedLibrary));
            _compilation = compilation;
        }

        private void CompileAndLoadAssembly()
        {
            using var ms = new MemoryStream();
            var result = _compilation.Emit(ms);
            ThrowExceptionIfCompilationFailure(result);
            ms.Seek(0, SeekOrigin.Begin);
            var assembly = AssemblyLoadContext.Default.LoadFromStream(ms);
            _generatedAssembly = assembly;
        }

        private void ThrowExceptionIfCompilationFailure(EmitResult result)
        {
            if (result.Success) return;
            
            var compilationErrors = result.Diagnostics.Where(diagnostic =>
                    diagnostic.IsWarningAsError ||
                    diagnostic.Severity == DiagnosticSeverity.Error)
                .ToList();
            
            if (!compilationErrors.Any()) return;
            var firstError = compilationErrors.First();
            var errorNumber = firstError.Id;
            var errorDescription = firstError.GetMessage();
            var firstErrorMessage = $"{errorNumber}: {errorDescription};";
            throw new Exception($"Compilation failed, first error is: {firstErrorMessage}");
        }

        private void Clear()
        {
            _generatedCode = null;
            _compilation = null;
            _generatedAssembly = null;
            _tests = null;

            GC.Collect();
        }
    }
}