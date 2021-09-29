package com.skorostov.carserviceserver.entity;


import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "services")
public class Services {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank(message = "Service Name is required.")
    private String name;

    @Min(value = 0, message = "Cost must be greater than zero or zero.")
    private int cost_our;

    @Min(value = 0, message = "Cost must be greater than zero or zero.")
    private int cost_foreign;

    public Services() {
    }

    public Services(String name,
                    int cost_our,
                    int cost_foreign) {
        this.name = name;
        this.cost_our = cost_our;
        this.cost_foreign = cost_foreign;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCost_our() {
        return cost_our;
    }

    public void setCost_our(int cost_our) {
        this.cost_our = cost_our;
    }

    public int getCost_foreign() {
        return cost_foreign;
    }

    public void setCost_foreign(int cost_foreign) {
        this.cost_foreign = cost_foreign;
    }

    @Override
    public String toString() {
        return "Services{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", cost_our=" + cost_our +
                ", cost_foreign=" + cost_foreign +
                '}';
    }
}
