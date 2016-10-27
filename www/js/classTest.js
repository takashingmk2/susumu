class classTest{
  constructor(se){
    this.session_id = "session";
    this.user_id = setFunc;
  }
  set setFunc(){
    return this.user_id;
  }
  aaa(){
    console.log("aaa");
    console.log(this.session_id);
    console.log(this.user_id);
  }
}
test = new classTest;