
</div>
<h1 className='website-title progress-title'>Your Progress</h1>
<h3 className='progress-tagline'> Check how you're doing!</h3>

<h4 id="stats-heading"> Player Stats</h4>

  <table id="stats-table">
    <tr id='HeadRow'>
      <td> Wins </td>
      <td> Losses </td>
    </tr>

    <tr>
      <td tableHeadData = "Wins"> {this.state.wins} </td>
      <td tableHeadData = 'Losses'> {this.state.losses} </td>
    </tr>
  </table>
  <BackButton />
  <a href="index.html">
    <button id='homepage-link'>
      Lemme Google Sign-In!
    </button>
  </a>
  <p id='sign-in-info'> (Psst. That way you can check your progress from around the world.)</p>
