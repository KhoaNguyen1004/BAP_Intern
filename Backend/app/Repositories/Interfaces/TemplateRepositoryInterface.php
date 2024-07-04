<?php

namespace App\Repositories\Interfaces;

interface TemplateRepositoryInterface extends RepositoryInterface
{
    public function checkTemplate();
    public function createTemplate($name,$logo,$title,$footer);
    public function getChosenTemplate($show);
    public function getAllTemplate();

}
