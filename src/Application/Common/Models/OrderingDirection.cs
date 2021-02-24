using System.Runtime.Serialization;

namespace SkillsBooster.Application.Common.Models
{
    public enum OrderingDirection
    {
        [EnumMember(Value = "")]
        None,
        [EnumMember(Value = "asc")]
        Asc,
        [EnumMember(Value = "desc")]
        Desc
    }
}