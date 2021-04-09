function displaySelection(userData) {
  if (userData.commentId) {
    let userProfile = userData;
    let displayUrl;
    if (userProfile.defaultProfileImage)
      displayUrl = userProfile.defaultProfileImage;
    //default takes second
    if (userProfile.customProfileImage)
      displayUrl = userProfile.customProfileImage;
      console.log(displayUrl)
    return displayUrl;
  } 

  if (userData.data?.defaultProfileImage) {
    let userProfile = userData.data;
    let displayUrl;

    //default takes Priority
    if (userProfile.defaultProfileImage)
      displayUrl = userProfile.defaultProfileImage;
    //default takes second
    if (userProfile.customProfileImage)
      displayUrl = userProfile.customProfileImage;
    return displayUrl;
  }

}

export default displaySelection;
