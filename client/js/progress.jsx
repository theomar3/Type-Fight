var React = require('react');

class Progress extends React.Component {


  render () {
    return (
      <div>
        <h1 className='website-title progress-title'>Your Progress</h1>
        <h3 className='tagline'> Check how you're doing!</h3>

        <h4 id="stats-heading"> Player Stats</h4>
          {/*Try to put username instead of "Player"*/}

        <table id="stats-table">
          <tr id='HeadRow'>
            <td> Character Name </td>
            <td> W-L Record </td>
            <td> CPU Difficulty </td>
            <td> Words Per Minute</td> {/*is this easy to do?*/}
          </tr>

          <tr>
            <td tableHeadData = "Character Name"> Goku </td>
            <td tableHeadData = 'W-L Record'> 3-0 </td>
            <td tableHeadData = 'CPU Difficulty'> Easy </td>
            <td tableHeadData = 'Words Per Minute'> 60 </td>
          </tr>

          <tr>
            <td tableHeadData = "Character Name"> Vegeta </td>
            <td tableHeadData = 'W-L Record'> 3-2 </td>
            <td tableHeadData = 'CPU Difficulty'> Easy </td>
            <td tableHeadData = 'Words Per Minute'> 40 </td>
          </tr>

          <tr>
            <td tableHeadData = "Character Name"> Frieza </td>
            <td tableHeadData = 'W-L Record'> 8-0 </td>
            <td tableHeadData = 'CPU Difficulty'> Medium </td>
            <td tableHeadData = 'Words Per Minute'> 80 </td>
          </tr>

          <tr>
            <td tableHeadData = "Character Name"> Cell </td>
            <td tableHeadData = 'W-L Record'> 3-1 </td>
            <td tableHeadData = 'CPU Difficulty'> Hard </td>
            <td tableHeadData = 'Words Per Minute'> 68 </td>
          </tr>


        </table>

        // On Progres page, has link to Character Select screen
        <h1 className='website-title character-select-title'>Character Select</h1>

      </div>
    );
  }
}

module.exports = Progress;
