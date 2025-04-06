package PlanifikuesInteraktiviUdhetimeve.Repository;


import PlanifikuesInteraktiviUdhetimeve.Entity.Activity;
import PlanifikuesInteraktiviUdhetimeve.Entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findByTrip(Trip trip);
}
