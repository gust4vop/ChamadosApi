using System;
using System.ComponentModel.DataAnnotations;

namespace ChamadosApi.Models
{
    public class Chamado
    {
        public int Id { get; set; }

        [Required]
        public DateTime DataCriacao { get; set; }

        [Required]
        [StringLength(2000)]
        public string Descricao { get; set; }

        [Required]
        [StringLength(20)]
        public string Status { get; set; }

    }
}
