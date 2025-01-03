<?php

namespace Modules\Tasks\App\Providers;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;
use Modules\Tasks\App\Http\Middleware\CheckAccess;
use Modules\Tasks\App\Repositories\Contracts\TaskRepositoryInterface;
use Modules\Tasks\App\Repositories\TaskRepository;
use Modules\Tasks\App\Services\Contracts\TaskServiceInterface;
use Modules\Tasks\App\Services\TaskService;

class TasksServiceProvider extends ServiceProvider
{
    protected string $moduleName = 'Tasks';

    protected string $moduleNameLower = 'tasks';

    protected $middleware = [
        'check.task.access' => CheckAccess::class,
    ];

    public function boot(): void
    {
        $this->registerMiddleware();
        $this->registerCommands();
        $this->registerCommandSchedules();
        $this->registerTranslations();
        $this->registerConfig();
        $this->registerViews();
        $this->loadMigrationsFrom(module_path($this->moduleName, 'Database/migrations'));
    }

    public function register(): void
    {
        $this->app->register(RouteServiceProvider::class);
        $this->app->bind(TaskRepositoryInterface::class, TaskRepository::class);
        $this->app->bind(TaskServiceInterface::class, TaskService::class);
    }

    public function registerTranslations(): void
    {
        $langPath = resource_path('lang/modules/' . $this->moduleNameLower);

        if (is_dir($langPath)) {
            $this->loadTranslationsFrom($langPath, $this->moduleNameLower);
            $this->loadJsonTranslationsFrom($langPath);
        } else {
            $this->loadTranslationsFrom(module_path($this->moduleName, 'lang'), $this->moduleNameLower);
            $this->loadJsonTranslationsFrom(module_path($this->moduleName, 'lang'));
        }
    }

    public function registerViews(): void
    {
        $viewPath = resource_path('views/modules/' . $this->moduleNameLower);
        $sourcePath = module_path($this->moduleName, 'resources/views');

        $this->publishes([$sourcePath => $viewPath], ['views', $this->moduleNameLower . '-module-views']);

        $this->loadViewsFrom(array_merge($this->getPublishableViewPaths(), [$sourcePath]), $this->moduleNameLower);

        $componentNamespace = str_replace(
            '/',
            '\\',
            config('modules.namespace') . '\\' . $this->moduleName . '\\' . config(
                'modules.paths.generator.component-class.path'
            )
        );
        Blade::componentNamespace($componentNamespace, $this->moduleNameLower);
    }

    public function provides(): array
    {
        return [];
    }

    protected function registerCommands(): void
    {
    }

    protected function registerCommandSchedules(): void
    {
    }

    protected function registerConfig(): void
    {
        $this->publishes(
            [module_path($this->moduleName, 'config/config.php') => config_path($this->moduleNameLower . '.php')],
            'config'
        );
        $this->mergeConfigFrom(module_path($this->moduleName, 'config/config.php'), $this->moduleNameLower);
    }

    protected function registerMiddleware(): void
    {
        foreach ($this->middleware as $name => $class) {
            $this->app['router']->aliasMiddleware($name, $class);
        }
    }

    private function getPublishableViewPaths(): array
    {
        $paths = [];
        foreach (config('view.paths') as $path) {
            if (is_dir($path . '/modules/' . $this->moduleNameLower)) {
                $paths[] = $path . '/modules/' . $this->moduleNameLower;
            }
        }

        return $paths;
    }
}
