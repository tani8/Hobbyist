$(document).on('page:change', function() {
  bindQuestionEvents();
});

function bindQuestionEvents() {
  $('body').on('click', 'a.vote', vote)
  // $('body').on('click', '.add_answer_button', answerModal)
  $('.new_answer').on('submit', createAnswer);
  $('.new_question').on('submit', createQuestion);
};

function vote(event){
  event.preventDefault();

  var button = $(this);
  var url = $(this).attr('href');

  $.ajax({
    url: url,
    type: 'get'
  }).done(function(data) {
    button.siblings('span').text(data);
  }).fail(function() {
    console.log('error');
  });
};

// function answerModal() {
//   event.preventDefault();
//   console.log('show modal')
//   $('#new_answer_modal').foundation('reveal', 'open');
//   $('#new_answer').attr('action').val(this.id);
//   debugger
// }

function createAnswer () {
  event.preventDefault();
  console.log('createAnswer')

  // var source = $('#new_answer_template').html();
  // var template = Handlebars.compile(source);

  var question_id = this.parentElement.classList[0];
  // debugger
  var body = $(this).find('textarea').val()
  var data = {answer: {body: body, question_id: question_id}};

  var response = $.ajax({
    url: '/answers',
    type: 'post',
    data: data
  }).done(function(answer) {
    var question_id = $('.open')[0].classList[0];
    var modal = $('#modal'+question_id);

    modal.foundation('reveal', 'close');
    modal.find('textarea').val('');

    $('#panel'+question_id).find('ul').append(answer);
  }).fail(function() {
    console.log('error');
  });
}

function createQuestion () {
  event.preventDefault();

  var data = $(this).serialize();

  var response = $.ajax({
    url: '/questions',
    type: 'post',
    data: data
  }).done(function(question) {
    var modal = $('#new-question-modal');

    modal.foundation('reveal', 'close');
    modal.find('textarea').val('');
    $("input[id='question_title']").val('');

    $('#question_list').append(question);
  }).fail(function() {
    console.log('error');
  });
}
