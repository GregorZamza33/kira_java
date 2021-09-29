INSERT INTO cars (num, color, mark, is_foreign) VALUES ('A000AA00', '#000000', 'BMW', true);
INSERT INTO cars (num, color, mark, is_foreign) VALUES ('A001AA00', '#FFFFFF', 'LADA', false);
INSERT INTO cars (num, color, mark, is_foreign) VALUES ('K777AK111', '#B3E731', 'NISSAN', true);

INSERT INTO masters (NAME) VALUES ('Alexey Pivovarov');
INSERT INTO masters (NAME) VALUES ('Vasya Matrosow');
INSERT INTO masters (NAME) VALUES ('Billy Herrington');
INSERT INTO masters (NAME) VALUES ('Sergey Fomin');

INSERT INTO services(NAME, COST_OUR, COST_FOREIGN) VALUES ('Change oil', 1000, 2000);
INSERT INTO services(NAME, COST_OUR, COST_FOREIGN) VALUES ('Washing', 350, 550);
INSERT INTO services(NAME, COST_OUR, COST_FOREIGN) VALUES ('Engine repair', 8000, 10000);
INSERT INTO services(NAME, COST_OUR, COST_FOREIGN) VALUES ('Wheel repair', 3000, 5000);
INSERT INTO services(NAME, COST_OUR, COST_FOREIGN) VALUES ('Repainting', 3000, 10000);
INSERT INTO services(NAME, COST_OUR, COST_FOREIGN) VALUES ('Check Up', 6000, 9000);

INSERT INTO works (date_work, masters_id, cars_id, services_id) VALUES ('2020-05-11', 1, 1, 1);
INSERT INTO works (date_work, masters_id, cars_id, services_id) VALUES ('2020-05-11', 1, 1, 2);
INSERT INTO works (date_work, masters_id, cars_id, services_id) VALUES ('2020-05-12', 3, 2, 4);
INSERT INTO works (date_work, masters_id, cars_id, services_id) VALUES ('2020-05-13', 3, 2, 4);