import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="validation"
export default class extends Controller {
  static targets = ["required", "radioRequired", "email", "form"]

  connect() {
    this.clearErrors()
  }

  validate(event) {
    event.preventDefault();

    this.clearErrors();

    const email = this.emailTarget.value;
    const required = this.requiredTarget.value;
    const radioSelected = this.isRadioSelected();
    let isValid = true;

    // Validate required fields
    if (this.isBlank(required)) {
      this.showError(this.requiredTarget, this.requiredTarget.getAttribute("data-label") + " can't be blank");
      isValid = false;
    }

    // Validate email
    if (this.isBlank(email)) {
      this.showError(this.emailTarget, "Email can't be blank");
      isValid = false;
    } else if (!this.isValidEmail(email)) {
      this.showError(this.emailTarget, "Please enter a valid email");
      isValid = false;
    }

    // Validate radio buttons
    if (!radioSelected) {
      this.showError(this.radioRequiredTarget, "Please select an option");
      isValid = false;
    }

    // If valid, submit the form
    if (isValid) {
      this.formTarget.submit();
    }
  }

  isBlank(value) {
    return !value;
  }

  isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  }

  isRadioSelected() {
    return this.radioRequiredTargets.some((radio) => radio.checked);
  }

  showError(target, message) {
    const errorMessage = document.createElement("div");
    errorMessage.classList.add("error-message");
    errorMessage.textContent = message;
    target.classList.add("is-invalid");
    target.parentElement.appendChild(errorMessage);
  }

  clearErrors() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((errorMessage) => errorMessage.remove());

    const invalidFields = document.querySelectorAll(".is-invalid");
    invalidFields.forEach((field) => field.classList.remove("is-invalid"));
  }
}
