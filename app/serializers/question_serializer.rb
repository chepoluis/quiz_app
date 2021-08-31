class QuestionSerializer
  include FastJsonapi::ObjectSerializer
  attributes :question_name, :correct_answer, :incorrect_answers, :exam_id
end
