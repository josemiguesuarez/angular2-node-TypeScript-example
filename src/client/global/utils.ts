export function modulePath(module: any): string {
    return module.id.replace('dist', 'src');
}
