/* comentário com várias linhas  
let nome_variavel_let = 15 //
var nome_variavel_var =  //
const nome_variavel // const: variável fixa. Ex.: Pi

// Var
if (true){
    var x = 10;
}
console.log(x);

//let

if(true){
    let y = 20;
    console.log(y);
}
console.log(y);*/

let canvas = document.getElementById("snake");
let contexto = canvas.getContext("2d");
let caixa = 32;
let snake = []; //vetor: atribui vários valores dentro, diferente das variáveis

snake[0] = {
    x: 8 * caixa,
    y: 8 * caixa
}

let direcao = "direita";

let comida = { //Math.floor: 
    x: Math.floor(Math.random() * 15 + 1) *caixa,
    y: Math.floor(Math.random() * 15 + 1) * caixa
}

function criarFundo( ){
    contexto.fillStyle = "pink";
    contexto.fillRect(0, 0, 16 * caixa, 16 * caixa);
}
criarFundo();

function criarCobrinha() {
    for (i=0; i < snake.length; i++){
        contexto.fillStyle = "darkred";
        contexto.fillRect(snake[i].x, snake[i].y, caixa, caixa);
        //contexto.fillRect() = desenha um retângulo prenchido no canvas
        //contexto.fillRect(coordenada x, coordenada y, largura, altura)
    }
}

function desenharComida(){
    contexto.fillStyle="darkorange"
    contexto.fillRect(comida.x, comida.y, caixa, caixa)
}

document.addEventListener('keydown', atualizarDirecao);

function atualizarDirecao(evento){
    if(evento.keyCode == 37 && direcao != 'direita') direcao ='esquerda' 
    if(evento.keyCode == 38 && direcao != 'baixo') direcao ='cima'
    if(evento.keyCode == 39 && direcao != 'esquerda') direcao ='direita'
    if(evento.keyCode == 40 && direcao != 'cima') direcao ='baixo' 
}
function reiniciarJogo() {
    // Resetar o estado do jogo
    snake = [];
    snake[0] = {
        x: 8 * bloco,
        y: 8 * bloco
    };
    direcao = "direita";
    comida = {
        x: Math.floor(Math.random() * 15 + 1) * bloco,
        y: Math.floor(Math.random() * 15 + 1) * bloco
    };

    // Oculta a tela de fim de jogo
    document.getElementById("game-over").style.display = "none";

    // Reinicia o loop do jogo
    jogo = setInterval(iniciarJogo, 50);
}
function iniciarJogo() {
//Teletransportar a cobra ao ultrapassar as bordas
    if (snake[0].x > 15 * caixa && direcao == 'direita') snake[0].x=0;
    if (snake[0].x < 0 * caixa && direcao == 'esquerda') snake[0].x= 16 * caixa;
    if (snake[0].y > 15 * caixa && direcao == 'baixo') snake[0].y= 0;
    if (snake[0].y < 0 && direcao == 'cima') snake[0].y= 16 * caixa;

    //Verificar a colisão da cabeça com o corpo
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            document.getElementById("game-over").style.display = "block";
        }
    }
    
    criarFundo();
    criarCobrinha();
    desenharComida();
    
    let cobraX =snake[0].x;
    let cobraY = snake[0].y;

    if (direcao =='direita') cobraX +=caixa;
    if (direcao =='esquerda') cobraX -=caixa;
    if (direcao =='cima') cobraY -=caixa;
    if (direcao =='baixo') cobraY +=caixa;

    if (cobraX != comida.x || cobraY != comida.y) {
        snake.pop();
    } else {
    
        comida.x = Math.floor(Math.random()* 15 + 1) *caixa,
        comida.y = Math.floor(Math.random()* 15 + 1) *caixa

    }
    
    let novaCabeca = {
        x: cobraX,
        y: cobraY
    }
        
        snake.unshift(novaCabeca)
}
let jogo = setInterval(iniciarJogo, 100)