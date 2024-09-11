class RecintosZoo {
    constructor() {
      this.recintos = [
        { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: ['MACACO', 'MACACO', 'MACACO'] },
        { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
        { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: ['GAZELA'] },
        { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
        { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: ['LEAO'] }
      ];
  
      this.animaisInfo = {
        'LEAO': { tamanho: 3, biomas: ['savana'], carnivoro: true },
        'LEOPARDO': { tamanho: 2, biomas: ['savana'], carnivoro: true },
        'CROCODILO': { tamanho: 3, biomas: ['rio'], carnivoro: true },
        'MACACO': { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
        'GAZELA': { tamanho: 2, biomas: ['savana'], carnivoro: false },
        'HIPOPOTAMO': { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
      };
    }
  
    analisaRecintos(animal, quantidade) {
      if (!this.animaisInfo[animal]) {
        return { erro: "Animal inválido" };
      }
  
      if (quantidade <= 0) {
        return { erro: "Quantidade inválida" };
      }
  
      const animalInfo = this.animaisInfo[animal];
      const recintosViaveis = [];
  
      for (let recinto of this.recintos) {
        
        if (!animalInfo.biomas.includes(recinto.bioma) && !(animalInfo.biomas.includes('savana') && recinto.bioma === 'savana e rio')) {
          continue;
        }
  
        
        const carnivorosExistentes = recinto.animais.filter(a => this.animaisInfo[a].carnivoro && a !== animal);
        if (carnivorosExistentes.length > 0 && animalInfo.carnivoro) {
          continue;
        }
  
        
        const espacoOcupado = recinto.animais.reduce((acc, a) => acc + this.animaisInfo[a].tamanho, 0);
        const espacoTotal = recinto.tamanhoTotal;
        let espacoNecessario = animalInfo.tamanho * quantidade;

        if (recinto.animais.length > 0 && !recinto.animais.every(a => a === animal)) {
            espacoNecessario += 1;
          }
  
        if (espacoTotal - espacoOcupado >= espacoNecessario) {
          recintosViaveis.push({
            numero: recinto.numero,
            espacoLivre: espacoTotal - (espacoOcupado + espacoNecessario),
            espacoTotal
          });
        }
      }
  
      if (recintosViaveis.length === 0) {
        return { erro: "Não há recinto viável" };
      }
  
      return {
        recintosViaveis: recintosViaveis.sort((a, b) => a.numero - b.numero).map(recinto =>
          `Recinto ${recinto.numero} (espaço livre: ${recinto.espacoLivre} total: ${recinto.espacoTotal})`
        )
      };
    }
  }
  
  export { RecintosZoo as RecintosZoo };