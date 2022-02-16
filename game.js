const textElement = document.getElementById("text")
const optionButtonsElement = document.getElementById("option-buttons")

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click',() => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
      id: 1, 
      text: 'You wake up in a strange place and see a jar of blue goo near you.',
      options: [
          {
              text: 'Take goo',
              setState: { blueGoo: true },
              nextText: 2
          },
          {
              text: 'Leave the goo',
              nextText: 2
          }
      ]  
    },
    {
        id: 2,
        text: 'You venture forth in search of answers to where you are when you come across a merchant',
        options:[
            {
                text: 'trade the goo for a sword',
                requiredState: (currentState) =>  currentState.blueGoo,
                setState: {blueGoo: false, sword: true},
                nextText: 3 
            },
            {
                text: 'trade the goo for a shield',
                requiredState: (currentState) =>  currentState.blueGoo,
                setState: {blueGoo: false, shield: true},
                nextText: 3 
            },
            {
                text: 'ignore the merchant',
                nextText: 3 
            }
        ]
    },
    {
        id: 3,
        text: 'After leaving the merchant you start to feel tired and stumble upon a small town next to a dangerous looking castle',
        options:[
            {
                text: 'Explore the castle',
                nextText: 4 
            },
            {
                text: 'Find a room to sleep at in the town',
                nextText: 5 
            },
            {
                text: 'Find some hay in the stable to sleep in',
                nextText: 6 
            }
        ]
    },
    {
        id: 4,
        text:'You are so tired that you fell asleep while exploring the castle and are killed by some terrible monster in your sleep.',
        options:
        [
        {
            text: 'Restart',
            nextText: -1
        }
        ]
    },
    {
        id: 5,
        text:'You find a small inn, but unfortunately have no money and get stabbed by a drunk',
        options:
        [
        {
            text: 'Restart',
            nextText: -1
        }
        ]
    },
    {
        id: 6,
        text:'You found some hay to sleep in but unfortunately you get stabbed',
        options:
        [
        {
            text: 'Restart',
            nextText: -1
        }
        ]
    }
]

startGame()