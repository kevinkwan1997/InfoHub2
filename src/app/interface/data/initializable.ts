export interface Initializable {
    init: () => Promise<boolean>
}
