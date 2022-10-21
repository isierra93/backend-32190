class Usuario {
    constructor(nombre, apellido, libros = [], mascotas = []) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    };
    addPet(newPet) {
        this.mascotas.push(newPet);
    };
    countPet() {
        return this.mascotas.length;
    };
    addBook(name, author) {
        let newBook = {
            name: name,
            author: author,
        };
        this.libros.push(newBook);
    };
    getBookName() {
        let names = [];
        for (const book of this.libros) {
            names.push(book.name);
        }
        return names;
    }
};

const user1 = new Usuario(`Ivan`, `Sierra`, [{ name: `El resplandor`, author: `Stephen King` }, { name: `Harry Potter y la piedra filosofal`, author: `J. K. Rowling` }], [`Amón`]);

user1.getFullName();
user1.addPet(`Champi`);
user1.countPet();
user1.addBook(`El Libro Negro de las Horas`, `Eva García Sáenz de Urturi`);
user1.getBookName();

