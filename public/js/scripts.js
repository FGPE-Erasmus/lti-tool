const getLtik = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const ltik = searchParams.get("ltik");
  if (!ltik) throw new Error("Missing lti key.");
  return ltik;
};

const createForm = async () => {
  console.log("creating form");
  const body = {
    ltik: getLtik(),
  };
  $.post("/lti-tool/deeplink", body, function (form) {
    $('#bodyForm').append(form)
  });
};

const getMembers = async () => {
  const body = {
    ltik: getLtik(),
  };
  $.post("/lti-tool/members", body, function (result) {
    for(const x of result){
      var name = x.name;
      var email = x.email;
      var roles = x.roles;
      var userId = x.user_id;
      $("#members_table").find('tbody').append("<tr><td>" + name + "</td><td>" + email + "</td><td>" + roles + "</td><td><input type='num' id='grade"+ userId + "'> <br> <input type='button' value='Submit grade' id='" + userId + "' onclick=setGrade('" + userId + "')></td></tr>");
    }
  });
};

const setGrade = async (userIdToken) => {
  const body = {
    ltik: getLtik(),
    grade: $("#grade" + userIdToken).val(),
    userId: userIdToken,
  };

  $.post("/lti-tool/grade", body, function (result) {
    alert("done");
    console.log(result);
  });
};
