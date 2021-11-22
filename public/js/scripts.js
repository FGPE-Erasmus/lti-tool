const getLtik = () => {
  const searchParams = new URLSearchParams(window.location.search)
  const ltik = searchParams.get('ltik')
  if (!ltik) throw new Error('Missing lti key.')
  return ltik
}

const setGrade = async (value) => {
    const body = {
        ltik: getLtik(),
        value: value
      }

    $.post("/grade", body, function(result){
        alert(result);
      });
  }

