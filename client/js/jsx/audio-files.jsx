import React from 'react';

class AudioFiles extends React.Component {

  render() {

    return(
      <div>
        {/*background audio*/}
      <audio id='mainTheme' src='/music/fight-music/enter-the-dragon.mp3'  autoPlay  />
      <audio id='MKTheme' src="/music/fight-music/MK-theme.mp3" />
      <audio id='GuileTheme' src='/music/fight-music/Guile-theme.mp3' />
      <audio id='FF7BossTheme' src='/music/fight-music/FF7-boss-theme.mp3' />
      <audio id ='OneWingedAngel' src='/music/fight-music/one-winged-angel2.mp3' />

        {/*game over audio*/}

      <audio id="gameOver" src="/music/game-over-audio/game-over-man.mp3" />
      <audio id='dna' src="/music/game-over-audio/dna.mp3" />
      <audio id='kneel' src='/music/game-over-audio/kneel.mp3' />
      <audio id='victory' src='/music/game-over-audio/victory.mp3' />

        {/*hit audio*/}

      <audio id='playerHit' src="/music/hit-audio/player-hit.mp3" />
      <audio id='cpuHit' src="/music/hit-audio/cpu-hit.mp3" />
      <audio id='warning' src="/music/hit-audio/warning.mp3" />
      <audio id='danger' src='/music/hit-audio/danger.mp3' />

        {/*heal audio*/}

      <audio id = 'gokuHeal' src='/music/heal-audio/goku-heal.mp3' />
      <audio id= 'dendeHeal' src="/music/heal-audio/dende-heal.mp3" />
      <audio id ='wrongInput' src="/music/heal-audio/wrong-input.mp3" />

        {/*cpu attack audio*/}

      <audio id = 'webBall' src="/music/cpu-attack-audio/web-ball.mp3" />
      <audio id ='spiderSting' src='/music/cpu-attack-audio/spider-sting.mp3' />
      <audio id = 'webSwing' src="/music/cpu-attack-audio/web-swing.mp3" />

        {/*player attack audio*/}

      <audio id = 'chargingSlash' src="/music/player-attack-audio/charging-slash.mp3" />
      <audio id = 'forwardSlash' src="/music/player-attack-audio/forward-slash.mp3" />
      <audio id = 'upwardSlash' src="/music/player-attack-audio/upward-slash.mp3" />

        {/*miss audio*/}

      <audio id = 'bradleyTaunt' src="/music/miss-audio/bradley-miss-taunt.mp3" />
      <audio id='laughTaunt' src='/music/miss-audio/laugh-miss-taunt.mp3' />
      <audio id='patheticTaunt' src="/music/miss-audio/pathetic-miss-taunt.mp3" />
      <audio id='suckTaunt' src='/music/miss-audio/suck-miss-taunt.mp3' />
    </div>
    );
  }
}

module.exports = AudioFiles;
