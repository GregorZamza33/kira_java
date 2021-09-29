package com.skorostov.carserviceserver.entity;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Date;

@Entity
@Table(name = "works")
public class Works {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private Date date_work;

    @ManyToOne(targetEntity = Masters.class)
    @NotNull(message = "Master is required.")
    private Masters masters;

    @ManyToOne(targetEntity = Cars.class)
    @NotNull(message = "Car is required.")
    private Cars cars;

    @ManyToOne(targetEntity = Services.class)
    @NotNull(message = "Service is required.")
    private Services services;

    public Works() {
    }

    public Works(Date date_work,
                 Masters masters,
                 Cars cars,
                 Services services) {
        this.date_work = date_work;
        this.masters = masters;
        this.cars = cars;
        this.services = services;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getDate_work() {
        return date_work;
    }

    public void setDate_work(Date date_work) {
        this.date_work = date_work;
    }

    public Masters getMaster() {
        return masters;
    }

    public void setMaster(Masters masters) {
        this.masters = masters;
    }

    public Cars getCar() {
        return cars;
    }

    public void setCar(Cars cars) {
        this.cars = cars;
    }

    public Services getService() {
        return services;
    }

    public void setService(Services services) {
        this.services = services;
    }

    @Override
    public String toString() {
        return "Works{" +
                "id=" + id +
                ", date_work=" + date_work +
                ", master=" + masters +
                ", car=" + cars +
                ", service=" + services +
                '}';
    }
}
