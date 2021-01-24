import { extend } from "vee-validate";
import { required, min, email, alpha_num } from "vee-validate/dist/rules";
import { setInteractionMode } from 'vee-validate';

setInteractionMode('lazy');

extend("required", {
  ...required,
  message: "This field is required"
});

extend("min", {
  ...min,
  message: "This field must have at least 7 characters"
});

extend("email", {
  ...email,
  message: "This field must be a valid email"
});

extend("alpha_num", {
  ...alpha_num,
  message: "This field may only contain alphabetic characters or numbers"
})
