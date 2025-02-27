'use strict';

/**
 * Returns the bank account number parsed from specified string.
 *
 * You work for a bank, which has recently purchased an ingenious machine to assist in reading letters and faxes sent in by branch offices.
 * The machine scans the paper documents, and produces a string with a bank account that looks like this:
 *
 *    _  _     _  _  _  _  _
 *  | _| _||_||_ |_   ||_||_|
 *  ||_  _|  | _||_|  ||_| _|
 *
 * Each string contains an account number written using pipes and underscores.
 * Each account number should have 9 digits, all of which should be in the range 0-9.
 *
 * Your task is to write a function that can take bank account string and parse it into actual account numbers.
 *
 * @param {string} bankAccount
 * @return {number}
 *
 * Example of return :
 *
 *   '    _  _     _  _  _  _  _ \n'+
 *   '  | _| _||_||_ |_   ||_||_|\n'+     =>  123456789
 *   '  ||_  _|  | _||_|  ||_| _|\n'
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '| | _| _|| ||_ |_   ||_||_|\n'+     => 23056789
 *   '|_||_  _||_| _||_|  ||_| _|\n',
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '|_| _| _||_||_ |_ |_||_||_|\n'+     => 823856989
 *   '|_||_  _||_| _||_| _||_| _|\n',
 *
 */
    function parseBankAccount(bankAccount) {
        const digitSize = {x: 3, y: 3};
        const rowLength = bankAccount.length / digitSize.y;
        const startPoint1Raw = 0;
        const startPoint2Raw = rowLength;
        const startPoint3Raw = startPoint2Raw * 2;
        const analizeStepLenght = digitSize.x;

        let result = '';
        let currentStartPoint1Raw = startPoint1Raw;
        let currentStartPoint2Raw = startPoint2Raw;
        let currentStartPoint3Raw = startPoint3Raw;

        for (let i = 1; i <= rowLength / analizeStepLenght; i++) {
            let analizeString = '';

            for (let j = 1; j <= rowLength / analizeStepLenght; j++) {
                if (j <= analizeStepLenght) {
                    analizeString += bankAccount[currentStartPoint1Raw];
                    currentStartPoint1Raw++;
                    continue;
                }
                if (j > analizeStepLenght && j <= analizeStepLenght * 2) {
                    analizeString += bankAccount[currentStartPoint2Raw];
                    currentStartPoint2Raw++;
                    continue;
                }
                if (j > analizeStepLenght && j <= analizeStepLenght * 3) {
                    analizeString += bankAccount[currentStartPoint3Raw];
                    currentStartPoint3Raw++;
                    continue;
                }
            break;
            }

            switch(analizeString) {
                case ' _ | ||_|':
                    result += 0;
                break;
                case '     |  |':
                    result += 1;
                break;
                case ' _  _||_ ':
                    result += 2;
                break;
                case ' _  _| _|':
                    result += 3;
                break;
                case '   |_|  |':
                    result += 4;
                break;
                case ' _ |_  _|':
                    result += 5;
                break;
                case ' _ |_ |_|':
                    result += 6;
                break;
                case ' _   |  |':
                    result += 7;
                break;
                case ' _ |_||_|':
                    result += 8;
                break;
                case ' _ |_| _|':
                    result += 9;
                break;
            }
        }
        return +result;
    }


/**
 * Returns the string, but with line breaks inserted at just the right places to make sure that no line is longer than the specified column number.
 * Lines can be broken at word boundaries only.
 *
 * @param {string} text
 * @param {number} columns
 * @return {Iterable.<string>}
 *
 * @example :
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 26 =>  'The String global object',
 *                                                                                                'is a constructor for',
 *                                                                                                'strings, or a sequence of',
 *                                                                                                'characters.'
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 12 =>  'The String',
 *                                                                                                'global',
 *                                                                                                'object is a',
 *                                                                                                'constructor',
 *                                                                                                'for strings,',
 *                                                                                                'or a',
 *                                                                                                'sequence of',
 *                                                                                                'characters.'
 */
function* wrapText(text, columns) {

    if (columns > text.length - 1) {
        yield text
    } else {
        let startPoint = 0;
        let analizePoint = columns - 1;
        let endPointCounter = 0;
        let result = [];

        function changePoints() {
            analizePoint + 1 <= text.length - 1 ? startPoint = analizePoint + 1 : startPoint = analizePoint;
            startPoint + columns <= text.length - 1 ? analizePoint = startPoint + columns : analizePoint = text.length - 1;
            if (analizePoint === text.length - 1) endPointCounter++;
        }

        while (endPointCounter <= 1) {
            if (text[analizePoint] === ' ' || analizePoint === text.length - 1) {
                result.push(text.slice(startPoint, analizePoint + 1).trim());
                changePoints();
            } else {
                while(text[analizePoint] !== ' ') {
                    analizePoint--;
                }
                result.push(text.slice(startPoint, analizePoint + 1).trim());
                changePoints();
            }
        }

        for (let i = 0; i < result.length; i++) {
            yield result[i]
        }
    }
}


/**
 * Returns the rank of the specified poker hand.
 * See the ranking rules here: https://en.wikipedia.org/wiki/List_of_poker_hands.
 *
 * @param {array} hand
 * @return {PokerRank} rank
 *
 * @example
 *   [ '4♥','5♥','6♥','7♥','8♥' ] => PokerRank.StraightFlush
 *   [ 'A♠','4♠','3♠','5♠','2♠' ] => PokerRank.StraightFlush
 *   [ '4♣','4♦','4♥','4♠','10♥' ] => PokerRank.FourOfKind
 *   [ '4♣','4♦','5♦','5♠','5♥' ] => PokerRank.FullHouse
 *   [ '4♣','5♣','6♣','7♣','Q♣' ] => PokerRank.Flush
 *   [ '2♠','3♥','4♥','5♥','6♥' ] => PokerRank.Straight
 *   [ '2♥','4♦','5♥','A♦','3♠' ] => PokerRank.Straight
 *   [ '2♥','2♠','2♦','7♥','A♥' ] => PokerRank.ThreeOfKind
 *   [ '2♥','4♦','4♥','A♦','A♠' ] => PokerRank.TwoPairs
 *   [ '3♥','4♥','10♥','3♦','A♠' ] => PokerRank.OnePair
 *   [ 'A♥','K♥','Q♥','2♦','3♠' ] =>  PokerRank.HighCard
 */
const PokerRank = {
    StraightFlush: 8,
    FourOfKind: 7,
    FullHouse: 6,
    Flush: 5,
    Straight: 4,
    ThreeOfKind: 3,
    TwoPairs: 2,
    OnePair: 1,
    HighCard: 0
}

function getPokerHandRank(hand) {
    const ranks = [];
    const suits = [];
    hand.forEach(card => {
        ranks.push(card.substring(0, card.length -1));
        suits.push(card.slice(-1));
    })
    const ranksRepeats = ranks.reduce((acc, rank) => {
        acc[rank] = (acc[rank] || 0) + 1;
        return acc;
        }, {});
    const suitsRepeats = suits.reduce((acc, suit) => {
        acc[suit] = (acc[suit] || 0) + 1;
        return acc;
        }, {});
    const sortedRanksRepeats = Object.keys(ranksRepeats).sort((a, b) => {
        if (!isNaN(a) && !isNaN(b)) {
            return Number(b) - Number(a);
        }
        if (isNaN(a) && isNaN(b)) {
            return a.toUpperCase() === 'J' ? 1 : a.toUpperCase() < b.toUpperCase() ? -1 : 1;
        }
        if (!isNaN(a)) return 1;
        if (isNaN(a)) return -1;
        return -1;
    });

    let counter = 1;
    for (let i = 1; i < sortedRanksRepeats.length; i++) {
        if (isNaN(sortedRanksRepeats[i-1]) && isNaN(sortedRanksRepeats[i])) {
            if ((sortedRanksRepeats[i-1].toUpperCase() === 'A' && sortedRanksRepeats[i].toUpperCase() === 'K')
            || (sortedRanksRepeats[i-1].toUpperCase() === 'K' && sortedRanksRepeats[i].toUpperCase() === 'Q')
            || (sortedRanksRepeats[i-1].toUpperCase() === 'Q' && sortedRanksRepeats[i].toUpperCase() === 'J')) {
                counter++;
                continue;
            } else {
                break;
            }
        }
        if (isNaN(sortedRanksRepeats[i-1]) && !isNaN(sortedRanksRepeats[i])) {
            if ((sortedRanksRepeats[i-1].toUpperCase() === 'J' && Number(sortedRanksRepeats[i]) === 10)
            || (sortedRanksRepeats[i-1].toUpperCase() === 'A' && Number(sortedRanksRepeats[i]) === 5)) {
                counter++;
                continue;
            } else {
                break;
            }
        }
        if (!isNaN(sortedRanksRepeats[i-1]) && !isNaN(sortedRanksRepeats[i])) {
            if ((Number(sortedRanksRepeats[i-1]) - Number(sortedRanksRepeats[i])) === 1) {
                counter++;
                continue;
            } else {
                break;
            }
        }
    }

    const isRanksArranged = counter === 5 ? true : false;

    if (isRanksArranged) {
        return Object.keys(suitsRepeats).length === 1 ? PokerRank.StraightFlush : PokerRank.Straight;
    }

    if (Object.values(ranksRepeats).filter(rep => rep === 4).length === 1) return PokerRank.FourOfKind;

    if (Object.values(ranksRepeats).filter(rep => rep === 3).length === 1) {
        return Object.values(ranksRepeats).filter(rep => rep === 2).length === 1 ? PokerRank.FullHouse : PokerRank.ThreeOfKind;
    }

    if (Object.keys(suitsRepeats).length === 1) return PokerRank.Flush;

    if (Object.values(ranksRepeats).filter(rep => rep === 2).length > 0) {
        return Object.values(ranksRepeats).filter(rep => rep === 2).length === 2 ? PokerRank.TwoPairs : PokerRank.OnePair;
    }

    return PokerRank.HighCard;
}


/**
 * Returns the rectangles sequence of specified figure.
 * The figure is ASCII multiline string comprised of minus signs -, plus signs +, vertical bars | and whitespaces.
 * The task is to break the figure in the rectangles it is made of.
 *
 * NOTE: The order of rectanles does not matter.
 *
 * @param {string} figure
 * @return {Iterable.<string>} decomposition to basic parts
 *
 * @example
 *
 *    '+------------+\n'+
 *    '|            |\n'+
 *    '|            |\n'+              '+------------+\n'+
 *    '|            |\n'+              '|            |\n'+         '+------+\n'+          '+-----+\n'+
 *    '+------+-----+\n'+       =>     '|            |\n'+     ,   '|      |\n'+     ,    '|     |\n'+
 *    '|      |     |\n'+              '|            |\n'+         '|      |\n'+          '|     |\n'+
 *    '|      |     |\n'               '+------------+\n'          '+------+\n'           '+-----+\n'
 *    '+------+-----+\n'
 *
 *
 *
 *    '   +-----+     \n'+
 *    '   |     |     \n'+                                    '+-------------+\n'+
 *    '+--+-----+----+\n'+              '+-----+\n'+          '|             |\n'+
 *    '|             |\n'+      =>      '|     |\n'+     ,    '|             |\n'+
 *    '|             |\n'+              '+-----+\n'           '+-------------+\n'
 *    '+-------------+\n'
 */
function* getFigureRectangles(figure) {
    const trimFigure = figure.replace(/\n/g, '')
    const result = [];
    const subEndPoints = [];
    let startPos = 0;
    let endPos = 0;
    let rowsQuant = 1;
    let isNextRect = true;
    let isOneRectangle = true;
    let nextSymb = null;
    let nextSymbCounter = 0;

    function getStringRect (start, end, rows) {
        return `+${'-'.repeat(end - start - 1)}+\n` + `|${' '.repeat(end - start - 1)}|\n`.repeat(rows) + `+${'-'.repeat(end - start - 1)}+\n`
    }

    function getStringFlatRect (start, end, rows) {
        return `+${'-'.repeat(end - start - 1)}+\n`.repeat(rows)
    }

    if (trimFigure.includes('|')) {
        for (let i = 0; i < trimFigure.length; i++) {

            if (trimFigure[i] === '+' || trimFigure[i] === '-' || trimFigure[i] === ' ') {
                continue;
            }

            if (trimFigure[i+1] === ' ' && nextSymbCounter < i + 1) {
                nextSymbCounter = i + 1;
                while (trimFigure[nextSymbCounter] === ' ') {
                    nextSymbCounter++;
                    if (trimFigure[nextSymbCounter] !== ' ') nextSymb = trimFigure[nextSymbCounter];
                }
            }

            if ((trimFigure[i] === '|' && trimFigure[i-1] === '+') || (trimFigure[i] === '|' && !startPos) ) {
                startPos = i;
                continue;
            }
            if (trimFigure[i] === '|' && trimFigure[i-1] === ' ' && trimFigure[i+1] === ' ' && isNextRect && startPos && nextSymb === '|') {
                isOneRectangle = false;
                subEndPoints.push(i);
                continue;
            }
            if (trimFigure[i] === '|' && trimFigure[i+1] === '|') {
                if(!endPos) endPos = i;
                rowsQuant++;
                isNextRect = false;
                continue;
            }
            if ((trimFigure[i] === '|' && trimFigure[i+1] === '+') || (trimFigure[i] === '|' && nextSymb === '+')) {
                if(!endPos) endPos = i;
                if (isOneRectangle) {
                    result.push(getStringRect(startPos, endPos, rowsQuant));
                }
                if (!isOneRectangle) {
                    if(subEndPoints.length > 1) {
                        subEndPoints.forEach((el, ind, arr) => {
                            if (ind === 0) {
                                result.push(getStringRect(startPos, el, rowsQuant));
                                return;
                            }
                            if (ind === subEndPoints.length - 1) {
                                result.push(getStringRect(arr[ind-1], el, rowsQuant))
                                result.push(getStringRect(el, endPos, rowsQuant));
                                return;
                            }
                                result.push(getStringRect(arr[ind-1], el, rowsQuant));
                                return;
                        });
                    } else {
                        result.push(getStringRect(startPos, subEndPoints[0], rowsQuant));
                        result.push(getStringRect(subEndPoints[0], endPos, rowsQuant));
                    }
                }
                startPos = 0;
                endPos = 0;
                rowsQuant = 1;
                isNextRect = true;
                isOneRectangle = true;
                subEndPoints.length = 0;
                continue;
            }
        }
    } else {
        for (let i = 0; i < figure.length; i++) {
            if (figure[i] === '+' && figure[i-1] === undefined) {
                startPos = i;
                continue;
            }
            if (figure[i] === '+' && (figure[i-1] === '-' || figure[i-1] === '+') && (figure[i+1] === '-' || figure[i+1] === '+')) {
                isOneRectangle = false;
                subEndPoints.push(i);
                continue;
            }
            if (figure[i] === '+' && figure[i+1] === '\n') {
                endPos = i;
                rowsQuant++;
                if (isOneRectangle) {
                    result.push(getStringFlatRect(startPos, endPos, rowsQuant));
                }
                if (!isOneRectangle) {
                    if(subEndPoints.length > 1) {
                        subEndPoints.forEach((el, ind, arr) => {
                            if (ind === 0) {
                                result.push(getStringFlatRect(startPos, el, rowsQuant));
                                return;
                            }
                            if (ind === subEndPoints.length - 1) {
                                result.push(getStringFlatRect(arr[ind-1], el, rowsQuant));
                                result.push(getStringFlatRect(el, endPos, rowsQuant));
                                return;
                            }
                                result.push(getStringFlatRect(arr[ind-1], el, rowsQuant));
                                return;
                        });
                    } else {
                        result.push(getStringFlatRect(startPos, subEndPoints[0], rowsQuant));
                        result.push(getStringFlatRect(subEndPoints[0], endPos, rowsQuant));
                    }
                }
            }
            break;
        }
    }

    for (let i = 0; i < result.length; i++) {
        yield result[i]
    }
}


module.exports = {
    parseBankAccount : parseBankAccount,
    wrapText: wrapText,
    PokerRank: PokerRank,
    getPokerHandRank: getPokerHandRank,
    getFigureRectangles: getFigureRectangles
};
