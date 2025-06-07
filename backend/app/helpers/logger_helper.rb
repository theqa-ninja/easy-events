require 'logger'
module LoggerHelper
  def ee_logger
    time = Time.zone.now
    Logger.new("log/log_#{time.strftime('%Y-%m-%d')}.log", 'daily')
  end
end
