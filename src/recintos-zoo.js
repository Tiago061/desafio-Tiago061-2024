class RecintosZoo {
    constructor(){
        this.recintos = [
        { numero: 1, bioma: 'savana', tamanhoTotal: 10, animaisExistentes: [{ especie: 'MACACO', quantidade: 3 }] },
        { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistentes: [] },
        { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animaisExistentes: [{ especie: 'GAZELA', quantidade: 1 }] },
        { numero: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistentes: [] },
        { numero: 5, bioma: 'savana', tamanhoTotal: 9, animaisExistentes: [{ especie: 'LEAO', quantidade: 1 }]}

        ];
    


    this.tiposAnimais = [
        { especie: 'LEAO', tamanho: 3, bioma: ['savana'], carnivoro: true },
        { especie: 'LEOPARDO', tamanho: 2, bioma: ['savana'], carnivoro: true },
        { especie: 'CROCODILO', tamanho: 3, bioma: ['rio'], carnivoro: true },
        { especie: 'MACACO', tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
        { especie: 'GAZELA', tamanho: 2, bioma: ['savana'], carnivoro: false },
        { especie: 'HIPOPOTAMO', tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false }
    ];
}

    getAnimalInfo(animal){
        return this.tiposAnimais.find(tipo => tipo.especie === animal);
    }

    analisaRecintos(animal, quantidade) {
        const resultado = {erro: null, recintosViáveis: [] };

        const infoAnimal = this.getAnimalInfo(animal);
        if(!infoAnimal){
            resultado.erro = "Animal inválido";
            return resultado;
        }

        if(quantidade <= 0){
            resultado.erro = "Quantidade inválida";
            return resultado;
        }
        for(const recinto of this.recintos) {
            let espacoUsado = recinto.animaisExistentes.reduce((acc, a) => {
                const info = this.getAnimalInfo(a.especie);
                return acc + (a.quantidade * info.tamanho);
            }, 0);
            
            if(recinto.animaisExistentes.length > 0){
                const existente = recinto.animaisExistentes[0];
                const infoExistente = this.getAnimalInfo(existente.especie);

                if(infoAnimal.carnivoro && (infoAnimal.especie !== infoExistente.especie)){
                    continue;
                }
                
                if(infoExistente.especie === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio'){
                    continue;
                }

                if (infoExistente.especie === 'MACACO' && recinto.animaisExistentes.length === 1 && quantidade === 1) {
                    continue;
                }

                if (infoAnimal.especie !== infoExistente.especie) {
                    espacoUsado += 1;
                }
        }
        if(!infoAnimal.bioma.includes(recinto.bioma)){
            continue;
        }

        const espacoNecessario = infoAnimal.tamanho * quantidade;
        const espacoLivre = recinto.tamanhoTotal - espacoUsado;
        if(espacoLivre >= espacoNecessario){
            resultado.recintosViáveis.push('Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})');
        }
    }
    if(resultado.recintosViáveis.length === 0){
        resultado.erro = "Não há recinto viável";
    }

    resultado.recintosViáveis.sort((a, b) => {
        const numeroA = parseInt(a.match(/recinto (\d+)/)[1]);
        const numeroB = parseInt(b.match(/recinto (\d+)/)[1]);
        return numeroA - numeroB;
    })

    return resultado;
}

}

export { RecintosZoo as RecintosZoo };
