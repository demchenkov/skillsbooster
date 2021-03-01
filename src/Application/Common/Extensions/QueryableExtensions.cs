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
        
        public static IQueryable<TSource> OrderByWithDirection<TSource>(this IQueryable<TSource> query, 
            string propertyName, 
            OrderingDirection direction) 
            => direction switch
            {
                OrderingDirection.None => query,
                OrderingDirection.Asc => query.OrderBy(propertyName),
                OrderingDirection.Desc => query.OrderByDescending(propertyName),
                _ => throw new ArgumentOutOfRangeException(nameof(direction), direction, null)
            };
        
        public static IOrderedQueryable<T> OrderBy<T>(this IQueryable<T> source, string propertyName)
        {
            return source.OrderBy(ToLambda<T>(propertyName));
        }

        public static IOrderedQueryable<T> OrderByDescending<T>(this IQueryable<T> source, string propertyName)
        {
            return source.OrderByDescending(ToLambda<T>(propertyName));
        }

        private static Expression<Func<T, object>> ToLambda<T>(string propertyName)
        {
            var parameter = Expression.Parameter(typeof(T));
            var property = Expression.Property(parameter, propertyName);
            var propAsObject = Expression.Convert(property, typeof(object));

            return Expression.Lambda<Func<T, object>>(propAsObject, parameter);            
        }
    }
}