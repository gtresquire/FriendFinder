$(document).ready(() => {
  var questions = [
    'How likely is it you will attend an opera some time this year?',
    'Someone needs a jump to recharge their car battery.  How likely are you to help?',
    'How likely are you to join a bowling league?',
    'A VIP ticket to a Metallica concert becomes available.  How likely are you to go?',
    'You see a digital speed limit sign up ahead.  How likely are you to speed up?',
    'You find a briefcase with $100k inside.  How likely is it your next stop will be the mall?',
    'There is only one beer remaining in the fridge.  How likely are you to drink this last beer?',
    'Your choices for take-out are Chinese or pizza.  How likely are you to choose pizza?',
    'Your neighbor is playing Bob Marley on their stereo.  How likely are you to ask them to turn it up?',
    'You are channel surfing and the movie Dodgeball is on.  How likely are you to watch?'
  ];
    
  var options = [
    'Select an option',
    '1 (Least Likely)',
    '2',
    '3',
    '4',
    '5 (Most Likely)'
  ];

  /* Questions rendering. */
  var renderQuestions = (() => {
    questions.forEach((question, index) => {
      var questionRow = $('<div>').addClass('row');
      $('#questions').append(questionRow);

      var questionCol = $('<div>').addClass('col-xs-12 col-sm-12 col-md-12');
      $(questionRow).append(questionCol);

      var questionDiv = $('<div>');
      questionCol.append(questionDiv);

      var label = $('<h3>').addClass('question-label')
                           .attr({
                             'id': 'label-' + index,
                             'data-index': index
                           })
                           .text('Question ' + (index + 1));
      var question = $('<h4>').addClass('question')
                              .attr({
                                'id': 'question-' + index,
                                'data-index': index
                              })
                              .text(question);
      questionDiv.append($(label)).append($(question));

      var selectDiv = $('<select>').addClass('form-control question-select')
                                   .attr({
                                     'id': 'select-' + index
                                   });
      questionCol.append(selectDiv);

      options.forEach((option, index) => {
        var optionDiv = $('<option>')
                        .attr({
                          'data-value': index
                        })
                        .text(option);
        selectDiv.append(optionDiv);
      })
    });
  })();

  /* Retrieve selected answer for each question. */
  var getAnswers = () => 
    questions.map((question, index) => 
      parseInt($('#select-' + index + ' option:selected').data('value')));

  /* Confirm form has been completed. */
  var validateInfo = friend => 
    (friend.name 
    && friend.photo 
    && (friend.scores.filter(score => score !== 0).length 
        === friend.scores.length)) 
    || false;

  /* Submits survey to server. */
  $(document).on("click", "#submit-survey", () => {
    var newFriend = {
      name: $('#name').val().trim(),
      photo: $('#photo').val().trim(),
      scores: getAnswers() 
    };

    if (validateInfo(newFriend)) {
      $.post({url: '/api/friends', 
              data: newFriend,
              traditional: true})
      .then(data => {
        /* Friend Matching. */
        $('#friend-name').text(data.name);
        $('#friend-img').attr("src", data.photo);
        $('#friend-modal').modal('show');

        /* Clears data. */
        $('#name').val('');
        $('#photo').val('');
        $('.question-select').val(options[0]);
      })
      .fail(error => console.log(error))
    }
    else {
      $('#error-modal').modal('show');
    }    
  });
});