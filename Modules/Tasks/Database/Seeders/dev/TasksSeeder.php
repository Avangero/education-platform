<?php

namespace Modules\Tasks\Database\Seeders\dev;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TasksSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            [
                'id' => 1,
                'course_id' => 1,
                'title' => 'Книга “Погружение в рефакторинг”',
                'content' => 'Прочитать, написать эссе в формате markdown, рецензию на книгу. В эссе так же указать какие приемы ты уже использовала с примерами своего кода, взять свои реквесты и применить на них новый изученный материал, вставить кусочек кода и написать какой прием надо было использовать и почему, а так же приложить исправленную версию. ',
                'status' => 1,
            ],
            [
                'id' => 2,
                'course_id' => 1,
                'title' => 'Книга “Погружение в паттерны проектирования”',
                'content' => 'Прочитать, написать эссе в формате markdown, рецензию на книгу. В эссе так же указать какие паттерны ты уже использовала с примерами своего кода, взять свои реквесты и применить на них новый изученый материал, вставить кусочек кода и написать какой паттерн надо было использовать и почему, а так же приложить исправленную версию. ',
                'status' => 1,
            ],
            [
                'id' => 3,
                'course_id' => 1,
                'title' => 'Статья про оптимизацию запросов',
                'content' => 'Написать краткое эссе, по каждому пункту статьи рассказать знала/не знала этот прием. Показать где использовала и где могла бы использовать новый изученный материал.',
                'status' => 1,
            ],
            [
                'id' => 4,
                'course_id' => 1,
                'title' => 'Vue - теория',
                'content' => "Официальная дока Vue - https://vuejs.org/guide.\nБЭМ методология - [https://ru.bem.info/methodology](https://ru.bem.info/methodology/).\nКурс по формам от гугла - [https://web.dev/learn/forms](https://web.dev/learn/forms/). \nСтаться про флексбоксы - https://web.dev/learn/css/flexbox?hl=ru.\nВидеокурс по Vue.",
                'status' => 1,
            ],
        ];

        DB::table('tasks')->insert($data);
    }
}
