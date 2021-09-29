package com.skorostov.carserviceserver.entity;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "cars")
public class Cars {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank(message = "Car number is required.")
    private String num;

    @NotBlank(message = "Car color is required.")
    private String color;

    @NotBlank(message = "Car model(mark) is required.")
    private String mark;

    private boolean isForeign;

    public Cars() {
    }

    public Cars(String num,
                String color,
                String mark,
                boolean isForeign) {
        this.num = num;
        this.color = color;
        this.mark = mark;
        this.isForeign = isForeign;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNum() {
        return num;
    }

    public void setNum(String num) {
        this.num = num;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getMark() {
        return mark;
    }

    public void setMark(String mark) {
        this.mark = mark;
    }

    public boolean getIsForeign() {
        return isForeign;
    }

    public void setIsForeign(boolean is_foreign) {
        this.isForeign = is_foreign;
    }

    @Override
    public String toString() {
        return "Cars{" +
                "id=" + id +
                ", num='" + num + '\'' +
                ", color='" + color + '\'' +
                ", mark='" + mark + '\'' +
                ", isForeign=" + isForeign +
                '}';
    }
}
