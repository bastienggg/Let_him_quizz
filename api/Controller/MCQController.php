<?php

require_once "Controller.php";
require_once "Repository/MCQRepositery.php";

class MCQController extends Controller{

    private MCQRepositery $MCQ;

    public function __construct() {
        $this->MCQ = new MCQRepositery();
    }

    protected function processGetRequest(HttpRequest $request){
        $param = $request->getParam("difficulty");
        if($param){
            return $this->MCQ->findOneByDifficulty($param);
        }
}}

?>