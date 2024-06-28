using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ChamadosApi.Data;
using ChamadosApi.Models;
using System.Linq;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class ChamadosController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ChamadosController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult GetChamados()
    {
        var chamados = _context.Chamados.ToList();
        return Ok(chamados);
    }

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetChamado(int id)
    {
        var chamado = _context.Chamados.FirstOrDefault(c => c.Id == id);
        if (chamado == null)
        {
            return NotFound();
        }
        return Ok(chamado);
    }

    [HttpPost]
    [Authorize]
    public IActionResult CreateChamado([FromBody] Chamado chamado)
    {
        if (ModelState.IsValid)
        {
            _context.Chamados.Add(chamado);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetChamado), new { id = chamado.Id }, chamado);
        }
        return BadRequest(ModelState);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateChamado(int id, [FromBody] Chamado chamado)
    {
        if (id != chamado.Id)
        {
            return BadRequest();
        }

        _context.Entry(chamado).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ChamadoExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return Ok();
    }

    private bool ChamadoExists(int id)
    {
        return _context.Chamados.Any(e => e.Id == id);
    }
}
