namespace ProAgil.API.Dto
{
    public class LoteDto
    {
        public int id { get; set; }
        public string Nome { get; set; }
        public decimal Preco { get; set; }
        public string DataInicio{get;set;}
        public string DataFim { get; set; }
        public int quantidade{get;set;}
    }
}