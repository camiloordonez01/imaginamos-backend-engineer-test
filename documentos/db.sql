CREATE TABLE technicians (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL
);

CREATE TABLE tickets (
  id SERIAL PRIMARY KEY,
  "token" TEXT NOT null,
  technicians_id INT NOT null,
  CONSTRAINT fk_tickets_technicians
      FOREIGN KEY(technicians_id) 
	  REFERENCES technicians(id)
);
