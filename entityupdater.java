import javax.persistence.Column;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;

public class EntityUpdater {

    public static void updateField(Object entity, String columnName, String newValue)
            throws NoSuchFieldException, IllegalAccessException, NoSuchMethodException, InvocationTargetException {
        Class<?> entityClass = entity.getClass();

        Field field = findFieldByColumnName(entityClass, columnName);

        if (field != null) {
            field.setAccessible(true);

            Class<?> fieldType = field.getType();

            if (fieldType.equals(String.class)) {
                field.set(entity, newValue);
            } else if (fieldType.equals(java.sql.Timestamp.class)) {
                // Convert newValue to Timestamp if needed
                java.sql.Timestamp timestampValue = java.sql.Timestamp.valueOf(newValue);
                field.set(entity, timestampValue);
            } else if (fieldType.equals(Double.class)) {
                // Convert newValue to Double if needed
                Double doubleValue = Double.parseDouble(newValue);
                field.set(entity, doubleValue);
            } else {
                System.out.println("Unsupported data type: " + fieldType.getSimpleName());
            }
        } else {
            System.out.println("Column not found: " + columnName);
        }
    }

    private static Field findFieldByColumnName(Class<?> entityClass, String columnName) {
        for (Field declaredField : entityClass.getDeclaredFields()) {
            Column columnAnnotation = declaredField.getAnnotation(Column.class);
            if (columnAnnotation != null && columnAnnotation.name().equals(columnName)) {
                return declaredField;
            }
        }
        return null;
    }
}
