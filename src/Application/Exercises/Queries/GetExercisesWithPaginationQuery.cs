﻿using System.Linq;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Converters;
using SkillsBooster.Application.Common.Extensions;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Application.Common.Mappings;
using SkillsBooster.Application.Common.Models;
using SkillsBooster.Application.Exercises.Dtos;
using SkillsBooster.Domain.Entities;
using SkillsBooster.Domain.Enums;

namespace SkillsBooster.Application.Exercises.Queries
{
    public class GetExercisesWithPaginationQuery: IRequest<PaginatedList<ExerciseDto>>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        
        public string FieldName { get; set; }

        public string Search { get; set; }
        public Difficulty? Difficulty { get; set; }
        public string Topic { get; set; }

        
        [JsonConverter(typeof(StringEnumConverter))]
        public OrderingDirection Order { get; set; }
    }

    public class GetExercisesWithPaginationQueryHandler: IRequestHandler<GetExercisesWithPaginationQuery, PaginatedList<ExerciseDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetExercisesWithPaginationQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        public Task<PaginatedList<ExerciseDto>> Handle(GetExercisesWithPaginationQuery request, CancellationToken cancellationToken)
        {
            IQueryable<Exercise> query = _context.Exercises;
            if (!string.IsNullOrWhiteSpace(request.FieldName))
            {
                query = query.OrderByWithDirection(request.FieldName.FirstCharToUpper(), request.Order);
            }

            if (!string.IsNullOrWhiteSpace(request.Search))
            {
                query = query.Where(x => EF.Functions.Like(x.Title, $"%{request.Search}%"));
            }

            if (request.Difficulty != null)
            {
                query = query.Where(x => x.Difficulty == request.Difficulty);
            }

            if (!string.IsNullOrWhiteSpace(request.Topic))
            {
                query = query.Where(x => EF.Functions.Like(x.Topic, $"%{request.Topic}%"));
            }


            return query
                .ProjectTo<ExerciseDto>(_mapper.ConfigurationProvider)
                .PaginatedListAsync(request.PageNumber, request.PageSize);
        }
    }

}