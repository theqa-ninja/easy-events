module ApplicationHelper
  def format_date(datetime_string)
    datetime_string.strftime('%B %e, %Y')
  end

  def format_time(datetime_string)
    datetime_string.strftime('%l:%M%P')
  end

  def format_date_time(datetime_string)
    datetime_string.strftime('%B %e %l:%M%P')
  end

  def markdown(text)
    options = {
      filter_html: false, # Allow raw HTML
      hard_wrap: true,    # Add <br> for newlines
      link_attributes: { rel: 'nofollow', target: '_blank' },
      space_after_headers: true,
      fenced_code_blocks: true
    }

    extensions = {
      autolink: true,
      superscript: true,
      disable_indented_code_blocks: true,
      tables: true
    }

    renderer = Redcarpet::Render::HTML.new(options)
    markdown = Redcarpet::Markdown.new(renderer, extensions)
    markdown.render(text).html_safe
  end
end
