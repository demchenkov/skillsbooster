using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Application.Exercises.Commands.CreateExercise
{
    public class CreateExerciseCommandValidator : AbstractValidator<CreateExerciseCommand>
    {
        private readonly IApplicationDbContext _context;
        public CreateExerciseCommandValidator(IApplicationDbContext context)
        {
            _context = context;
            
            RuleFor(v => v.Title)
                .NotEmpty().WithMessage("Title is required.")
                .MaximumLength(200).WithMessage("Title must not exceed 200 characters.")
                .MustAsync(BeUniqueTitle).WithMessage("The specified title already exists.");
        }
        
        private Task<bool> BeUniqueTitle(string title, CancellationToken cancellationToken)
        {
            return _context.Exercises
                .AllAsync(l => l.Title != title, cancellationToken);
        }
    }
}