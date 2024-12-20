export const locationDetails = [
  {
    label: "Name",
    type: "text",
    nameAndId: "fullname",
    hookForm: {
      required: "Full name is required",
      validate: (value) => {
        if (!value.includes(" ")) return "Input your full name";
      },
    },
    displayErrorMessage(errors) {
      {
        if (errors.fullname)
          return <p className="text-red-500">{errors.fullname.message}</p>;
      }
    },
  },
  {
    label: "Mobile Number 1",
    type: "tel",
    nameAndId: "mobile",
    hookForm: {
      required: "Phone is required",
      minLength: {
        value: 10,
        message: "must be atleast 10 characters",
      },
    },
    displayErrorMessage(errors) {
      {
        if (errors.mobile)
          return <p className="text-red-500">{errors.mobile.message}</p>;
      }
    },
  },
  {
    label: "Mobile Number 2",
    type: "tel",
    nameAndId: "home",
    hookForm: {
      minLength: {
        value: 10,
        message: "must be atleast 10 characters",
      },
    },
    displayErrorMessage(errors) {
      {
        if (errors.home)
          return <p className="text-red-500">{errors.home.message}</p>;
      }
    },
  },
  {
    label: "County",
    type: "text",
    nameAndId: "county",
    hookForm: {
      required: "Select your county",
    },
    displayErrorMessage(errors) {
      {
        if (errors.county)
          return <p className="text-red-500">{errors.county.message}</p>;
      }
    },
  },
  {
    label: "City / Province",
    type: "text",
    nameAndId: "city",
    hookForm: {
      required: "Select your city",
    },
    displayErrorMessage(errors) {
      {
        if (errors.city)
          return <p className="text-red-500">{errors.city.message}</p>;
      }
    },
  },
  {
    label: "Street / Community",
    type: "text",
    nameAndId: "community",
    hookForm: {
      required: "Community is required",
    },
    displayErrorMessage(errors) {
      {
        if (errors.community)
          return <p className="text-red-500">{errors.community.message}</p>;
      }
    },
  },
];
