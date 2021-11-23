const getLtik = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const ltik = searchParams.get("ltik");
  if (!ltik) throw new Error("Missing lti key.");
  return ltik;
};

const setGrade = async (value) => {
  const body = {
    ltik: getLtik(),
    value: value,
  };

  $.post("/lti-tool/teste", body, function (result) {
    alert(result);
  });

  $.post("/lti-tool/grade", body, function (result) {
    alert(result);
  });
};
