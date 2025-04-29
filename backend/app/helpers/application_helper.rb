module ApplicationHelper
  def format_date(datetime_string)
    datetime_string.strftime("%B %e, %Y")
  end

  def format_time(datetime_string)
    datetime_string.strftime("%l:%M%P")
  end

  def format_date_time(datetime_string)
    datetime_string.strftime("%B %e %l:%M%P")
  end
end
