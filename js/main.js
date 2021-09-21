
//boa prática = const vai ser usado mais, deixar o let pra qndo a variável precisar ser alterada mais pra frente
//qndo função não funcionar usa console.log = this para achar aonde está o this dessa função



// aqui os nomes das funções podem ser outros, esses são mais usados. 
const Main = {      // main com M maiusculo pq vai ser a variável principal

    init: function() {  //init = initial     
        this.cacheSelectors()       //this para buscar oq ta edindo dentro do pai, no caso o Main
        this.bindEvents()
    },
    cacheSelectors: function() {  //selecionar dentro do html e armazena em uma variável
        this.$checkButtons = document.querySelectorAll('.check')        //$ boa prática, já sabe q é um elemento html
        this.$inputTask = document.querySelector('#inputTask')
        this.$list = document.querySelector('#list')
        this.$removeButtons = document.querySelectorAll('.remove')
    },
    bindEvents: function() {        //add evento às variaveis atribuidas antes
        const self = this           //this não funciona dentro da função abaixo, então renomeia para self e chama la dentro

        this.$checkButtons.forEach(function(button) {
            button.onclick = self.Events.checkButton_click
        })

        this.$inputTask.onkeypress = self.Events.inputTask_keypress.bind(this)  //ligando com o this daqui para puxar la em baixo

        this.$removeButtons.forEach(function(button) {      //pode usar button de nv pq o nome só vale pra dentro da sua função
            button.onclick = self.Events.removeButton_click
        })
    },



    Events: {
        checkButton_click: function(e) {
            const li = e.target.parentElement
            //console.log(li.classList.contains('done')) vai aparecer no console true se tiver essa class ou false se não
            const isDone = li.classList.contains('done')

            /*
            if (isDone) {
                li.classList.remove('done')
            } else {
                li.classList.add('done')
            }
            */

            //boas práticas, checa a negativa primeiro e se é vdd return, se é falsa o código continua e remove.
            if (!isDone) {
                return li.classList.add('done')
            }

            li.classList.remove('done')
        },

        inputTask_keypress: function(e) {
            const key = e.key
            const value = e.target.value

            if (key === 'Enter') {
                this.$list.innerHTML += `
                    <li>
                        <div class="check"></div>
                        <label class="task">
                            ${value}
                        </label>
                        <button class="remove"></button>
                    </li>
                `

                e.target.value = ''

                this.cacheSelectors()
                this.bindEvents()
            }
        },

        removeButton_click: function(e) {
            let li = e.target.parentElement

            li.classList.add('removed')

            setTimeout(function() {
                li.classList.add('hidden')
            },300)
        }
    }
}

Main.init()