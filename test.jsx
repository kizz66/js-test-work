/**
 В этом тесте мы должны создать электронного сдавальщика карт.
 Нужно создать "колоду", у которой есть метод "deal(numCards)" который
 сдает случайные карты из колоды. Когда в колоде не хватает карт чтобы
 сдать на стол следует сгенерировать новую колоду и недостающие карты
 сдать уже из нее
 Следует использовать готовые массивы мастей и номиналов карт.

 Кнопка Deal внизу должна вызывать "deal(5)"
 */


const suits = ['♠', '♥', '♦', '♣'];
const faces = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

let
    cardPack = [],
    dealResult = [],
    packSize;

getRandomCardIndex = () => {
    return Math.floor(Math.random() * packSize);
};

makeCardPack = () => {
    faces.forEach((face, faceId) => {
        suits.forEach((suit, suitId) => {
            cardPack.push({'face': faceId, 'suit': suitId});
        })
    });
    packSize = cardPack.length;
};

getCard = () => {
    let
        index = getRandomCardIndex(),
        card = {'face': cardPack[index].face, 'suit': cardPack[index].suit};

    cardPack.splice(index, 1);
    packSize--;

    return card;
};

getDealsPortion = (numCards) => {
    let portion = [];

    for (let i = 1; i <= numCards; i++) {
        portion.push(getCard());
        if (packSize == 0 && i < numCards) {
            makeCardPack();
        }
    }
    return portion;
};

prepareResultToRender = () => {
    let resultForRender = [];

    dealResult.forEach((portion)=> {
        let cardPortion = portion.map((card)=> {
            return faces[card.face] + suits[card.suit];
        });
        resultForRender.push(cardPortion.join(' '));
    });
    return resultForRender;
};

render= () =>{
    let result  = prepareResultToRender();

    result.forEach((item)=>{
        console.log(item);
    });
};

deal = (numCards) => {
    do {
        dealResult.push(getDealsPortion(numCards))
    } while (packSize > 0);

    render();
};

makeCardPack();

var button = document.getElementById('deal');
button.addEventListener('click', function(e) {
    deal(5);
});


