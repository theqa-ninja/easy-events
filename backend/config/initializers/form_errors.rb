ActionView::Base.field_error_proc = proc do |html_tag, instance_tag|
  fragment = Nokogiri::HTML.fragment(html_tag)
  field = fragment.at('input,select,textarea')

  html = if field
           field['class'] = "#{field['class']} invalid"
           html = <<-HTML
              #{fragment}
              <p class="error">#{instance_tag&.error_message&.first}</p>
           HTML
           html
         else
           html_tag
         end

  # html.html_safe # rubocop said it's not safe to use html_safe on a string
  html
end
