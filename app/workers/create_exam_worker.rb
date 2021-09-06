class CreateExamWorker
    include Sidekiq::Worker

    def perform(data)
        p "--------------"
        p Dir.pwd

        path = "#{Dir.pwd}/history/history.txt"
        FileUtils.mkdir_p(File.dirname(path))

        File.open(path, "a") do |f|
            f.puts data
        end
    end
end