using System;
using System.Linq;
using System.Linq.Expressions;
using SkillsBooster.Application.Common.Models;

namespace SkillsBooster.Application.Common.Extensions
{
    public static class QueryableExtensions
    {
        public static IQueryable<TSource> OrderByWithDirection<TSource, TKey>(this IQueryable<TSource> query, 
            Expression<Func<TSource, TKey>> keySelector, 
            OrderingDirection direction) 
        => direction switch
        {
            OrderingDirection.None => query,
            OrderingDirection.Asc => query.OrderBy(keySelector),
            OrderingDirection.Desc => query.OrderByDescending(keySelector),
            _ => throw new ArgumentOutOfRangeException(nameof(direction), direction, null)
        };
    }
}