const D51 = {
  STR: [
    '      ====        ________                ___________',
    '  _D _|  |_______/        \\__I_I_____===__|_________|',
    '   |(_)---  |   H\\________/ |   |        =|___ ___|  ',
    '   /     |  |   H  |  |     |   |         ||_| |_||  ',
    '  |      |  |   H  |__--------------------| [___] |  ',
    '  | ________|___H__/__|_____/[][]~\\_______|       |  ',
    '  |/ |   |-----------I_____I [][] []  D   |=======|__',
  ],
  WHL: [
    [
      '__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__',
      ' |/-=|___|=    ||    ||    ||    |_____/~\\___/        ',
      '  \\_/      \\_O=====O=====O=====O/      \\_/            ',
    ],
    [
      '__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__',
      ' |/-=|___|=   O=====O=====O=====O|_____/~\\___/        ',
      '  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/            ',
    ],
    [
      '__/ =| o |=-~O=====O=====O=====O\\ ____Y___________|__',
      ' |/-=|___|=    ||    ||    ||    |_____/~\\___/        ',
      '  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/            ',
    ],
    [
      '__/ =| o |=-O=====O=====O=====O \\ ____Y___________|__',
      ' |/-=|___|=    ||    ||    ||    |_____/~\\___/        ',
      '  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/            ',
    ],
    [
      '__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__',
      ' |/-=|___|=O=====O=====O=====O   |_____/~\\___/        ',
      '  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/            ',
    ],
    [
      '__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__',
      ' |/-=|___|=    ||    ||    ||    |_____/~\\___/        ',
      '  \\_/      \\O=====O=====O=====O_/      \\_/            ',
    ],
  ],
  COAL: [
    '                              ',
    '                              ',
    '    _________________         ',
    '   _|                \\_____A  ',
    ' =|                        |  ',
    ' -|                        |  ',
    '__|________________________|_ ',
    '|__________________________|_ ',
    '   |_D__D__D_|  |_D__D__D_|   ',
    '    \\_/   \\_/    \\_/   \\_/    ',
  ],
};

const locLength = D51.STR[0].length + D51.COAL[0].length;

/**
 * gets the appropriate locomotive for i steps in the animation
 * @param {number} i how far along the animation should be (in characters)
 * @param {number} window the width of the window of viewing for the bot
 * @returns {string} the string for the animation
 */
function getLocomotive(i, window) {
  // get components of the train
  const { STR, WHL, COAL } = D51;
  // put together the locomotive and the wheels
  let locomotive = STR.concat(WHL[i % WHL.length]);
  // add coal cart to the end
  locomotive = locomotive.map((str, j) => str + COAL[j]);
  // find appropriate amount of padding on the left (it might be none)
  const padding = ' '.repeat(Math.max(window - i, 0));
  // finally, add the padding and crop the locomotive to viewport size (accounting for the padding)
  return locomotive.map((str) => `${padding}${str.substring(i < window ? 0 : i - window + 1, i)}`).join('\n');
}

module.exports = {
  length: locLength,
  get: getLocomotive,
};
