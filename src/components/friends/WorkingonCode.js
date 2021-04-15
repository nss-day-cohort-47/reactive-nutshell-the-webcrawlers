export const getStudentsInCohort = (cohort) => {
    const filteredStudents = students.filter(studentObj => studentObj.cohort === cohort)
    return filteredStudents
}
console.log(getStudentsInCohort(43))

export const getJustFriends = (friend) => {
    const filteredFriends = friend.filter(friendObj => friendObj.cohort === cohort)
    return filteredFriends
}
console.log(getStudentsInCohort(43))
//------------------------------------------------------------------------------------












//set the logged in users id number equal to loggedInUser2
let loggedInUser2 =  sessionStorage.getItem("nutshell_user");

//a function that matches the logged in users id with a "friend userId"
//and returns the  "friend userId"
export const realFriendList = (friend, users) => {
   if (loggedInUser2 === friend.currentUserId){
       let friendUserId = friend.userId
       //loop through the users...
        //and... if a user's id matches the friendUserId
       const filteredFriends = users.filter(userObj => userObj.id === friendUserId)
      
       //return the friend's name
return filteredFriends

   }
}
