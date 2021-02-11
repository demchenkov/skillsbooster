using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Exercises.Commands.CreateExercise;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Application.Exercises.Commands.UpdateExercise
{
    public class UpdateExerciseCommandValidator : AbstractValidator<CreateExerciseCommand>
    {
        private readonly IApplicationDbContext _context;

        public UpdateExerciseCommandValidator(IApplicationDbContext context)
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