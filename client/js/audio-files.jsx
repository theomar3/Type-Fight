import React from 'react';

class AudioFiles extends React.Component {

  render() {

    return(
      <div>
        {/*background audio*/}
      <audio id='mainTheme' src='/music/enter-the-dragon.mp3' autoPlay />
      <audio id='MKTheme' src="/music/MK-theme.mp3" />
      <audio id='GuileTheme' src='/music/Guile-theme.mp3' />
      <audio id='FF7BossTheme' src='/music/FF7-boss-theme.mp3' />
      <audio id ='OneWingedAngel' src='/music/one-winged-angel2.mp3' />

        {/*game over audio*/}

      <audio id="gameOver" src="/music/game-over-man.mp3" />
      <audio id='dna' src="/music/dna.mp3" />
      <audio id='kneel' src='/music/kneel.mp3' />
      <audio id='victory' src='/music/victory.mp3' />

        {/*hit audio*/}

      <audio id='playerHit' src="/music/player-hit.mp3" />
      <audio id='cpuHit' src="/music/cpu-hit.mp3" />
      <audio id='warning' src="/music/warning.mp3" />
      <audio id='danger' src='/music/danger.mp3' />

        {/*heal audio*/}

      <audio id = 'gokuHeal' src='/music/goku-heal.mp3' />
      <audio id= 'dendeHeal' src="/music/dende-heal.mp3" />
      <audio id ='wrongInput' src="/music/wrong-input.mp3" />

        {/*cpu attack audio*/}

      <audio id = 'webBall' src="/music/web-ball.mp3" />
      <audio id ='spiderSting' src='/music/spider-sting.mp3' />
      <audio id = 'webSwing' src="/music/web-swing.mp3" />

        {/*player attack audio*/}

      <audio id = 'chargingSlash' src="/music/charging-slash.mp3" />
      <audio id = 'forwardSlash' src="/music/forward-slash.mp3" />
      <audio id = 'upwardSlash' src="/music/upward-slash.mp3" />

        {/*miss audio*/}

      <audio id = 'bradleyTaunt' src="/music/bradley-miss-taunt.mp3" />
      <audio id = 'laughTaunt' src='/music/laugh-miss-taunt.wav' />
      <audio id = 'patheticTaunt' src='/music/pathetic-miss-taunt.wav' />
      <audio id = 'suckTaunt' src='/music/suck-miss-taunt.wav' />
    </div>
    );
  }
}

module.exports = AudioFiles;
