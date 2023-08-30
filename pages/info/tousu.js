// feedbackPage.js
Page({
  data: {
    feedbackContent: '', // To store the user's input content
    contactInformation: '', // To store the user's input contact information
  },

  onInput: function(event) {
    // Update the data with the user's input content
    this.setData({
      feedbackContent: event.detail.value,
    });
  },

  onContactInput: function(event) {
    // Update the data with the user's input contact information
    this.setData({
      contactInformation: event.detail.value,
    });
  },

  submitFeedback: function() {
    // You can add your submission logic here, e.g., sending the feedback to a server or saving it in a database
    // For this example, we will log the data to the console
    console.log('Feedback Content:', this.data.feedbackContent);
    console.log('Contact Information:', this.data.contactInformation);

    // Optionally, you can show a success message or navigate back to the previous page after submission
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 1000,
      // complete: function() {
      //   // Navigate back to the previous page
      //   wx.navigateBack({
      //     delta: 1,
      //   });
      // },
    });
  },
});
